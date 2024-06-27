<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class NewsController extends Controller
{
    public function index()
    {
        try {
            $client = new Client();
            $apiKey = env('NEWSAPI_KEY');
            $response = $client->request('GET', 'https://newsapi.org/v2/top-headlines', [
                'query' => [
                    'country' => 'br',
                    'apiKey' => $apiKey,
                ]
            ]);

            if ($response->getStatusCode() == 200) {
                $data = json_decode($response->getBody()->getContents(), true);
                $articles = $data['articles'];
                return response()->json($articles);
            } else {
                throw new \Exception('Erro ao buscar artigos da API.');
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}


