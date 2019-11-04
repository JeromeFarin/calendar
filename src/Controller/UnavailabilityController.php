<?php

namespace App\Controller;

use App\Repository\UnavailabilityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UnavailabilityController extends AbstractController
{
    /**
     * @Route("/unavailabilities", name="unavailabilities")
     */
    public function index(Request $request ,UnavailabilityRepository $repository)
    {
        $content = json_decode($request->getContent(), true);
        return $this->json($repository->findAllBetweenDate($content['start'], $content['end']));
    }
}
