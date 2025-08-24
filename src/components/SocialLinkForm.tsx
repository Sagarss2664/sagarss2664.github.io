
import { useEffect, useState } from "react";
import { SocialLink } from "@/services/storageService";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IconPicker from "./IconPicker";

interface SocialLinkFormProps {
  socialLink?: SocialLink;
  isOpen: boolean;
  onClose: () => void;
  onSave: (socialLink: Omit<SocialLink, "id"> | SocialLink) => void;
}

const SocialLinkForm: React.FC<SocialLinkFormProps> = ({
  socialLink,
  isOpen,
  onClose,
  onSave,
}) => {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("Link");

  useEffect(() => {
    if (socialLink) {
      setPlatform(socialLink.platform);
      setUrl(socialLink.url);
      setIcon(socialLink.icon);
    } else {
      // Default values for new social link
      setPlatform("");
      setUrl("");
      setIcon("Link");
    }
  }, [socialLink, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedSocialLink = {
      ...(socialLink && { id: socialLink.id }),
      platform,
      url,
      icon,
    };
    
    onSave(updatedSocialLink);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {socialLink ? "Edit Social Link" : "Add New Social Link"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Input
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="E.g., GitHub, LinkedIn, Twitter"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                type="url"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <IconPicker value={icon} onChange={setIcon} />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SocialLinkForm;
