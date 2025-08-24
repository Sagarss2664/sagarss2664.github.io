
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SocialLink } from "@/services/storageService";
import * as Icons from "lucide-react";
import { Plus, Trash } from "lucide-react";
import SocialLinkForm from "./SocialLinkForm";
import { useToast } from "@/components/ui/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SocialLinksManagerProps {
  socialLinks: SocialLink[];
  isOpen: boolean;
  onClose: () => void;
  onAddSocialLink: (socialLink: Omit<SocialLink, "id">) => void;
  onUpdateSocialLink: (socialLink: SocialLink) => void;
  onDeleteSocialLink: (id: string) => void;
}

const SocialLinksManager: React.FC<SocialLinksManagerProps> = ({
  socialLinks,
  isOpen,
  onClose,
  onAddSocialLink,
  onUpdateSocialLink,
  onDeleteSocialLink,
}) => {
  const [socialLinkToEdit, setSocialLinkToEdit] = useState<SocialLink | null>(null);
  const [socialLinkToDelete, setSocialLinkToDelete] = useState<SocialLink | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Handle edit social link
  const handleEditSocialLink = (socialLink: SocialLink) => {
    setSocialLinkToEdit(socialLink);
    setIsFormOpen(true);
  };

  // Handle delete social link
  const handleDeleteSocialLink = (socialLink: SocialLink) => {
    setSocialLinkToDelete(socialLink);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (socialLinkToDelete) {
      onDeleteSocialLink(socialLinkToDelete.id);
      toast({
        title: "Social link deleted",
        description: `${socialLinkToDelete.platform} link has been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setSocialLinkToDelete(null);
  };

  // Handle save social link
  const handleSaveSocialLink = (socialLink: Omit<SocialLink, "id"> | SocialLink) => {
    if ("id" in socialLink) {
      onUpdateSocialLink(socialLink);
      toast({
        title: "Social link updated",
        description: `${socialLink.platform} link has been updated successfully.`,
      });
    } else {
      onAddSocialLink(socialLink);
      toast({
        title: "Social link added",
        description: `${socialLink.platform} link has been added successfully.`,
      });
    }
    setIsFormOpen(false);
    setSocialLinkToEdit(null);
  };

  // Handle add new social link
  const handleAddSocialLink = () => {
    setSocialLinkToEdit(null);
    setIsFormOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Social Links</DialogTitle>
          <DialogDescription>
            Add, edit, or remove social media links.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 mb-4">
          <Button onClick={handleAddSocialLink} className="mb-4">
            <Plus className="mr-2 h-4 w-4" />
            Add New Social Link
          </Button>
          
          <div className="space-y-2">
            {socialLinks.length > 0 ? (
              socialLinks.map((link) => {
                const Icon = (Icons as any)[link.icon] || Icons.Link;
                
                return (
                  <div 
                    key={link.id}
                    className="flex items-center justify-between p-3 bg-secondary/40 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-secondary rounded-full p-2">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{link.platform}</h4>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-muted-foreground hover:text-accent truncate max-w-[200px] inline-block"
                        >
                          {link.url}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button 
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditSocialLink(link)}
                        className="h-8 w-8"
                      >
                        <Icons.Edit size={16} />
                      </Button>
                      <Button 
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteSocialLink(link)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No social links added yet.
              </div>
            )}
          </div>
        </div>
        
        {/* Social link form dialog */}
        <SocialLinkForm
          socialLink={socialLinkToEdit}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveSocialLink}
        />
        
        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the {socialLinkToDelete?.platform} link.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
};

export default SocialLinksManager;
