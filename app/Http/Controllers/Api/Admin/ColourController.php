<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\Colours\StoreColourRequest;
use App\Http\Resources\Api\Admin\ColourResource;
use App\Models\Colour;
use F9Web\ApiResponseHelpers;
use Illuminate\Http\Request;

class ColourController extends Controller
{
    use ApiResponseHelpers;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->respondWithSuccess(
            ColourResource::collection(
                Colour::select(['id', 'value'])->get()
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreColourRequest $request)
    {
        foreach ($request->validated('colours') as $colour) {
            Colour::create([
                'value'    => $colour['value'],
                'hex_code' => $colour['hexCode'],
            ]);
        }

        return $this->respondWithSuccess([
            'message' => __('responses.crud.saved', [
                'model' => __('models.colours.multiple'),
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Colour  $colour
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Colour $colour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Colour  $colour
     * @return \Illuminate\Http\Response
     */
    public function destroy(Colour $colour)
    {
        $colour->delete();

        return $this->respondWithSuccess([
            'message' => __('responses.crud.deleted', [
                'model' => __('models.colours.single'),
            ]),
        ]);
    }
}
