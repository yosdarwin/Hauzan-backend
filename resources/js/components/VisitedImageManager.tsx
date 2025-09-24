import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, X, Save, Upload } from 'lucide-react';
import { useState, useRef } from 'react';

export interface VisitedImage {
    id?: string;
    image: File | string;
    description: string;
    preview?: string;
}

interface VisitedImageManagerProps {
    images: VisitedImage[];
    onImagesChange: (images: VisitedImage[], removedImagePaths?: string[]) => void;
    disabled?: boolean;
}

export default function VisitedImageManager({ images, onImagesChange, disabled = false }: VisitedImageManagerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<VisitedImage | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<{ image: File | null; description: string }>({
        image: null,
        description: '',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddImage = () => {
        setEditingImage(null);
        setFormData({ image: null, description: '' });
        setIsEditing(true);
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleEditImage = (image: VisitedImage) => {
        setEditingImage(image);
        setFormData({
            image: null,
            description: image.description,
        });
        setIsEditing(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleSave = () => {
        if (editingImage) {
            // Update existing image
            const updatedImages = images.map(img =>
                img.id === editingImage.id
                    ? { ...img, description: formData.description, ...(formData.image && { image: formData.image, preview: URL.createObjectURL(formData.image) }) }
                    : img
            );
            onImagesChange(updatedImages);
        } else {
            // Add new image
            if (formData.image) {
                const newImage: VisitedImage = {
                    id: Date.now().toString(),
                    image: formData.image,
                    description: formData.description,
                    preview: URL.createObjectURL(formData.image),
                };
                onImagesChange([...images, newImage]);
            }
        }

        setIsEditing(false);
        setEditingImage(null);
        setFormData({ image: null, description: '' });
    };

    const handleDelete = (imageId: string) => {
        if (confirm('Are you sure you want to remove this image?')) {
            const imageToDelete = images.find(img => img.id === imageId);
            const filteredImages = images.filter(img => img.id !== imageId);

            // Track removed image path if it's an existing image (string path)
            const removedPaths: string[] = [];
            if (imageToDelete && typeof imageToDelete.image === 'string') {
                removedPaths.push(imageToDelete.image);
            }

            onImagesChange(filteredImages, removedPaths);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingImage(null);
        setFormData({ image: null, description: '' });
    };

    const getImageUrl = (image: VisitedImage) => {
        if (typeof image.image === 'string') {
            return `/storage/${image.image}`;
        } else {
            return image.preview || URL.createObjectURL(image.image);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Visited Tours Images ({images.length})</Label>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={disabled}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Manage Images
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Manage Visited Tours Images</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                            {/* Add/Edit Form */}
                            {isEditing && (
                                <Card className="border-primary/20">
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Image</Label>
                                                <div className="flex gap-4">
                                                    <div className="flex-shrink-0">
                                                        {(formData.image || editingImage) && (
                                                            <div className="w-32 h-20 border rounded overflow-hidden">
                                                                <img
                                                                    src={formData.image
                                                                        ? URL.createObjectURL(formData.image)
                                                                        : editingImage
                                                                            ? getImageUrl(editingImage)
                                                                            : ''
                                                                    }
                                                                    alt="Preview"
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => fileInputRef.current?.click()}
                                                        >
                                                            <Upload className="h-4 w-4 mr-2" />
                                                            {editingImage ? 'Change Image' : 'Choose Image'}
                                                        </Button>
                                                        <input
                                                            ref={fileInputRef}
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                            className="hidden"
                                                        />
                                                        <p className="text-xs text-muted-foreground">
                                                            Supported formats: JPEG, PNG, JPG, GIF, WebP (max 2MB)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Enter a description for this image..."
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    onClick={handleSave}
                                                    disabled={!formData.description.trim() && (!editingImage && !formData.image)}
                                                >
                                                    <Save className="h-4 w-4 mr-2" />
                                                    {editingImage ? 'Update' : 'Add'} Image
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={handleCancel}
                                                >
                                                    <X className="h-4 w-4 mr-2" />
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Images List */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Current Images ({images.length})</h4>
                                    {!isEditing && (
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={handleAddImage}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Image
                                        </Button>
                                    )}
                                </div>

                                {images.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No images added yet.</p>
                                        <p className="text-sm">Click "Add Image" to get started.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {images.map((image) => (
                                            <Card key={image.id} className="p-4">
                                                <div className="flex gap-4">
                                                    <div className="w-24 h-16 border rounded overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={getImageUrl(image)}
                                                            alt={image.description || 'Visited tour image'}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="font-medium text-sm">
                                                            {image.description || 'No description'}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {typeof image.image === 'string' ? 'Existing image' : `${image.image.name} (${(image.image.size / 1024 / 1024).toFixed(2)} MB)`}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleEditImage(image)}
                                                            disabled={isEditing}
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(image.id!)}
                                                            disabled={isEditing}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Summary Display */}
            {images.length > 0 && (
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {images.slice(0, 8).map((image) => (
                        <div key={image.id} className="aspect-video border rounded overflow-hidden">
                            <img
                                src={getImageUrl(image)}
                                alt={image.description || 'Preview'}
                                className="w-full h-full object-cover"
                                title={image.description || 'No description'}
                            />
                        </div>
                    ))}
                    {images.length > 8 && (
                        <div className="aspect-video border rounded flex items-center justify-center bg-muted text-sm text-muted-foreground">
                            +{images.length - 8}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}