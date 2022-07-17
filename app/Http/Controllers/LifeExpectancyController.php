<?php

namespace App\Http\Controllers;

use App\Models\LifeExpectancy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class LifeExpectancyController extends Controller
{
    public function importFromCsv(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|mimes:csv'
        ]);

        // Upload file
        $file = $request->file;
        $name = Carbon::now()->getTimestamp() . '.' . $file->getClientOriginalExtension();
        $file->move('uploads', $name);

        ini_set('max_execution_time', 1200);

        // Read uploaded file and import data
        $row = 0;
        if (($handle = fopen('uploads/' . $name, 'r')) !== false) {
            while (($data = fgetcsv($handle)) !== false) {
                if ($row >= 3) {
                    $country_name = $data[0];
                    $country_code = $data[1];
                    $year = 1990;

                    foreach ($data as $col => &$item) {
                        if ($col >= 3) {
                            LifeExpectancy::create([
                                'country_name' => $country_name,
                                'country_code' => $country_code,
                                'year' => $year,
                                'life_expectancy' => $item ? $item : 0
                            ]);

                            $year++;
                        }
                    }
                }

                $row++;
            }

            fclose($handle);
        }

        return $this->respond('Imported successfully.');
    }

    public function getAll(Request $request)
    {
        $per_page = $request->input('per_page') ?? 25;
        $country_code = $request->input('country_code');
        $year = $request->input('year');
        $data = LifeExpectancy::query();

        if ($country_code) {
            $data->where('country_code', $country_code);
        }

        if ($year) {
            $data->where('year', $year);
        }

        $data = $data->paginate($per_page);
        return $this->respond('Success.', $data);
    }

    public function getCountries()
    {
        $data = LifeExpectancy::select(DB::raw('DISTINCT country_name, country_code'))->get();
        return $this->respond('Success.', $data);
    }

    private function respond($message, $data = null, $status = Response::HTTP_OK)
    {
        return response()->json(['message' => $message, 'data' => $data], $status);
    }
}
