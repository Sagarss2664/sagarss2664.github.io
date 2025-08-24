
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Certificate } from "@/services/storageService";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import CertificateViewer from "./CertificateViewer";

interface CertificateCardProps {
  certificate: Certificate;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  isAdmin = false,
  onEdit,
  onDelete
}) => {
  const [showViewer, setShowViewer] = useState(false);
  
  // Format date function
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <Card className="relative overflow-hidden rounded-xl bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-accent/20 transition-all duration-300">
        <div
          className="relative aspect-video overflow-hidden cursor-pointer"
          onClick={() => setShowViewer(true)}
        >
          {certificate.image ? (
            <div className="w-full h-full bg-gray-100/10 relative">
              <img
                src={certificate.image}
                alt={`Certificate: ${certificate.title}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-900/60 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
          
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 hover:bg-accent/80 border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setShowViewer(true);
              }}
              aria-label="View certificate"
            >
              <Eye className="h-4 w-4" />
            </Button>

            {certificate.url && (
              <a
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-accent/80 border-white/20"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View certificate externally"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 p-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="text-base md:text-lg font-medium text-gradient truncate">
                {certificate.title}
              </h3>
            </TooltipTrigger>
            <TooltipContent>{certificate.title}</TooltipContent>
          </Tooltip>

          <div className="flex justify-between text-sm text-white/70">
            <span className="truncate max-w-[150px]">
              {certificate.issuer || "Unknown Issuer"}
            </span>
            <span>{certificate.date ? formatDate(certificate.date) : "No Date"}</span>
          </div>
        </div>

        {/* Admin actions */}
        {isAdmin && (
          <div className="absolute top-2 left-2 flex gap-2 z-10">
            {onEdit && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/50 hover:bg-blue-500/80 border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/50 hover:bg-red-500/80 border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Certificate Viewer */}
      <CertificateViewer 
        isOpen={showViewer} 
        onClose={() => setShowViewer(false)} 
        certificate={certificate} 
      />
    </>
  );
};

export default CertificateCard;
