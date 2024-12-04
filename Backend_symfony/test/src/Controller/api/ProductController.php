<?php

namespace App\Controller\api;

use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends AbstractController
{
    #[Route('/api/products', name: 'product_list', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $products = $entityManager->getRepository(Product::class)->findAll();

        $productArray = [];
        foreach ($products as $product) {
            $productArray[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'category' => $product->getCategory(),
            ];
        }

        return $this->json([
            'products' => $productArray
        ]);
    }


    #[Route('/api/products_show/{id}', name: 'product_show', methods: ['GET'])]
    public function show($id, EntityManagerInterface $entityManager): JsonResponse
    {
        $product = $entityManager->getRepository(Product::class)->find($id);
        return $this->json($product);
    }

    #[Route('/api/product_delete/{id}', name: 'product_delete', methods: ['DELETE'])]
    public function delete($id, EntityManagerInterface $entityManager): JsonResponse
    {
        $product = $entityManager->getRepository(Product::class)->find($id);
        $entityManager->remove($product);
        $entityManager->flush();
        return $this->json([
            'message' => 'Product deleted successfully'
        ]);
    }

    #[Route('/api/product_add', name: 'product_add', methods: ['POST'])]
    public function add(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $new_product = new Product();

        $new_product->setName($data['name']);
        $new_product->setDescription($data['description']);
        $new_product->setPrice($data['price']);
        $new_product->setCategory($data['category']);
        $new_product->setCreatedAt(new \DateTime());
        $entityManager->persist($new_product);
        $entityManager->flush();

        return $this->json([
            'message' => 'Product added successfully'
        ]);
    }

    #[Route('/api/product_update/{id}', name: 'product_update', methods: ['PUT'])]
    public function update($id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $updated_product_data = json_decode($request->getContent(), true);

        $updated_product = $entityManager->getRepository(Product::class)->find($id);

        if (isset($updated_product_data['name'])) {
            $updated_product->setName($updated_product_data['name']);
        }

        if (isset($updated_product_data['description'])) {
            $updated_product->setDescription($updated_product_data['description']);
        }

        if (isset($updated_product_data['price'])) {
            $updated_product->setPrice($updated_product_data['price']);
        }

        if (isset($updated_product_data['category'])) {
            $updated_product->setCategory($updated_product_data['category']);
        }

        $entityManager->persist($updated_product);
        $entityManager->flush();

        return $this->json([
            'message' => 'Product updated successfully'
        ]);
    }
}
