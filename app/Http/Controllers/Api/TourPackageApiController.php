<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TourPackage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TourPackageApiController extends Controller
{
    /**
     * Transform tour data to include proper image formatting with descriptions
     */
    private function transformTourData($tour)
    {
        $tourData = is_array($tour) ? $tour : $tour->toArray();

        // Format visited_tours_images with descriptions
        if (isset($tourData['visited_tours_images']) && is_array($tourData['visited_tours_images'])) {
            $tourData['visited_tours_images'] = array_map(function ($imageData) {
                if (is_string($imageData)) {
                    return [
                        'image' => $imageData,
                        'image_url' => asset('storage/' . $imageData),
                        'description' => ''
                    ];
                } elseif (is_array($imageData)) {
                    return [
                        'image' => $imageData['image'] ?? '',
                        'image_url' => isset($imageData['image']) ? asset('storage/' . $imageData['image']) : null,
                        'description' => $imageData['description'] ?? ''
                    ];
                }
                return $imageData;
            }, $tourData['visited_tours_images']);
        } else {
            $tourData['visited_tours_images'] = [];
        }

        // Add main image URL
        if (!empty($tourData['image'])) {
            $tourData['image_url'] = asset('storage/' . $tourData['image']);
        }

        return $tourData;
    }
    /**
     * Get all tour packages with pagination and filtering
     */
    public function index(Request $request): JsonResponse
    {
        $query = TourPackage::query();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Filter by location
        if ($request->has('location') && !empty($request->location)) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        // Filter by price range
        if ($request->has('min_price') && !empty($request->min_price)) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price') && !empty($request->max_price)) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by duration
        if ($request->has('duration') && !empty($request->duration)) {
            $query->where('duration', 'like', "%{$request->duration}%");
        }

        // Featured tours only
        if ($request->has('featured') && $request->featured === 'true') {
            $query->where('featured', true);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $allowedSortFields = ['title', 'price', 'duration', 'location', 'created_at'];
        if (in_array($sortBy, $allowedSortFields)) {
            $query->orderBy($sortBy, $sortOrder);
        }

        // Pagination
        $perPage = $request->get('per_page', 9);
        $perPage = min($perPage, 50); // Limit to 50 items per page

        $tours = $query->paginate($perPage);

        // Transform tour data to include proper image formatting
        $transformedTours = array_map([$this, 'transformTourData'], $tours->items());

        return response()->json([
            'success' => true,
            'data' => $transformedTours,
            'pagination' => [
                'current_page' => $tours->currentPage(),
                'last_page' => $tours->lastPage(),
                'per_page' => $tours->perPage(),
                'total' => $tours->total(),
                'from' => $tours->firstItem(),
                'to' => $tours->lastItem(),
                'has_more_pages' => $tours->hasMorePages(),
                'links' => $tours->linkCollection()->toArray()
            ],
            'filters' => [
                'search' => $request->search,
                'location' => $request->location,
                'min_price' => $request->min_price,
                'max_price' => $request->max_price,
                'duration' => $request->duration,
                'featured' => $request->featured,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder
            ]
        ]);
    }

    /**
     * Get a specific tour package by slug
     */
    public function show(string $slug): JsonResponse
    {
        $tour = TourPackage::where('slug', $slug)->first();

        if (!$tour) {
            return response()->json([
                'success' => false,
                'message' => 'Tour package not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->transformTourData($tour)
        ]);
    }

    /**
     * Get featured tour packages
     */
    public function featured(Request $request): JsonResponse
    {
        $tours = TourPackage::where('featured', true)->latest()->get();
        $transformedTours = array_map([$this, 'transformTourData'], $tours->toArray());

        return response()->json([
            'success' => true,
            'data' => $transformedTours
        ]);
    }
    /**
     * Get popular tour packages
     */
    public function popular(Request $request): JsonResponse
    {
        $tours = TourPackage::latest()->take(8)->get();
        $transformedTours = array_map([$this, 'transformTourData'], $tours->toArray());

        return response()->json([
            'success' => true,
            'data' => $transformedTours
        ]);
    }

    /**
     * Get tour packages by location
     */
    public function byLocation(string $location): JsonResponse
    {
        $tours = TourPackage::where('location', 'like', "%{$location}%")
            ->latest()
            ->get();
        $transformedTours = array_map([$this, 'transformTourData'], $tours->toArray());

        return response()->json([
            'success' => true,
            'data' => $transformedTours,
            'location' => $location
        ]);
    }

    /**
     * Get tour package statistics
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total_tours' => TourPackage::count(),
            'featured_tours' => TourPackage::where('featured', true)->count(),
            'locations' => TourPackage::distinct('location')->pluck('location')->filter(),
            'price_range' => [
                'min' => TourPackage::min('price'),
                'max' => TourPackage::max('price'),
                'avg' => TourPackage::avg('price')
            ],
            'recent_tours' => TourPackage::latest()->limit(5)->get(['id', 'title', 'slug', 'created_at'])
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Search tour packages with advanced filters
     */
    public function search(Request $request): JsonResponse
    {
        $query = TourPackage::query();

        // Advanced search
        if ($request->has('q') && !empty($request->q)) {
            $searchTerm = $request->q;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                    ->orWhere('description', 'like', "%{$searchTerm}%")
                    ->orWhere('full_description', 'like', "%{$searchTerm}%")
                    ->orWhere('location', 'like', "%{$searchTerm}%")
                    ->orWhereJsonContains('highlights', $searchTerm)
                    ->orWhereJsonContains('included', $searchTerm);
            });
        }

        $tours = $query->latest()->get();
        $transformedTours = array_map([$this, 'transformTourData'], $tours->toArray());

        return response()->json([
            'success' => true,
            'data' => $transformedTours,
            'query' => $request->q,
            'count' => count($transformedTours)
        ]);
    }

    public function footer()
    {
        $footerTour = TourPackage::latest()->take(4)->select('title', 'slug')->get();
        

        return response()->json([
            'success' => true,
            'data' => $footerTour
        ]);
    }
}
