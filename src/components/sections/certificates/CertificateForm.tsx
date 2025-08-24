
import { useEffect, useState } from "react";
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
import { Certificate } from "@/services/storageService";
import ImageUpload from "@/components/ImageUpload";

interface CertificateFormProps {
  certificate?: Certificate;
  isOpen: boolean;
  onClose: () => void;
  onSave: (certificate: Omit<Certificate, "id"> | Certificate) => void;
}

const CertificateForm: React.FC<CertificateFormProps> = ({
  certificate,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("/placeholder.svg");

  useEffect(() => {
    if (certificate) {
      setTitle(certificate.title);
      setIssuer(certificate.issuer);
      setDate(certificate.date);
      setUrl(certificate.url || "");
      setImage(certificate.image || "/placeholder.svg");
    } else {
      // Default values for new certificate
      setTitle("");
      setIssuer("");
      setDate("");
      setUrl("");
      setImage("/placeholder.svg");
    }
  }, [certificate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedCertificate = {
      ...(certificate && { id: certificate.id }),
      title,
      issuer,
      date,
      url: url || undefined,
      image: image !== "/placeholder.svg" ? image : undefined,
    };
    
    onSave(updatedCertificate);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {certificate ? "Edit Certificate" : "Add New Certificate"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Certificate Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter certificate title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Organization</Label>
              <Input
                id="issuer"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="E.g., Coursera, Udemy, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date Issued</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">Certificate URL (optional)</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/certificate"
                type="url"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Certificate Image (optional)</Label>
              <ImageUpload 
                defaultImage={image}
                onImageChange={setImage}
              />
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Certificate</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateForm;
