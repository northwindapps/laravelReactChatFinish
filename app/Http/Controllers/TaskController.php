<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use App\Events\PostCreated;
use Validator;

class TaskController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, Task $task)
    {
        //
        $createdPost = $request->create([
            'body' => $request->body,
        ]);
        // broadcast
        broadcast(new PostCreated($createdPost, $request->user()))->toOthers;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[

          'text' => 'required'
        ]);

        if($validator->fails()){
          $response = array('response' => $validator->messages(), 'success' => false);
          return $response;
        } else {
            
          // Create item
          $task = new Task;
          $task->text = $request->input('text');
          $task->message = $request->input('message');
          $task->save();

          return response()->json($task);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Task::find($id);
        return response()->json($item);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
