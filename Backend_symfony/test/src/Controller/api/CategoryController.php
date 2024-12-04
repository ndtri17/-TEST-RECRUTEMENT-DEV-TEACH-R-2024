<?php

namespace App\Controller\api;

use App\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;


class CategoryController extends AbstractController
{
    #[Route('api/category', name: 'category_list', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
       $categories = $entityManager ->getRepository(Category::class)->findAll();
       $categoryArray = [];
        foreach ($categories as $category) {
            $categoryArray[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
            ];
        }

        return $this->json([
            'categories' => $categoryArray
        ]);
    }

    #[Route('api/category_add', name: 'category_add', methods: ['POST'])]                       
    public function add(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $category = new Category();
        $category->setName($data['name']);

        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json([
            'message' => 'Category added successfully'
        ]);
    }

    #[Route('/api/category_delete/{id}', name: 'category_delete', methods: ['DELETE'])]
    public function delete($id, EntityManagerInterface $entityManager): JsonResponse
    {
        $category = $entityManager->getRepository(Category::class)->find($id);
        $entityManager->remove($category);
        $entityManager->flush();
        return $this->json([
            'message' => 'Category deleted successfully'
        ]);
    }
}
