
// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { AuthProvider } from "@/contexts/AuthContext";
// // import { ThemeProvider } from "@/contexts/ThemeContext";
// // import ProtectedRoute from "@/components/ProtectedRoute";
// // import Index from "./pages/Index";
// // import AdminPanel from "./pages/admin";
// // import AdminLogin from "./pages/admin/login";
// // import NotFound from "./pages/NotFound";
// // import Resume from "./pages/Resume";
// // import ChatbotFab from "@/components/ChatbotFab";
// // import "@/lib/fontawesome"; // This runs only once!

// // const queryClient = new QueryClient();

// // const App = () => (
// //   <QueryClientProvider client={queryClient}>
// //     <ThemeProvider>
// //       <AuthProvider>
// //         <TooltipProvider>
// //           <Toaster />
// //           <Sonner />
// //           <BrowserRouter basename="/">
// //             <Routes>
// //               <Route path="/" element={<Index />} />
// //               <Route path="/admin/login" element={<AdminLogin />} />
// //               <Route path="/admin" element={
// //                 <ProtectedRoute requireAdmin={true}>
// //                   <AdminPanel />
// //                 </ProtectedRoute>
// //               } />
// //               <Route path="/resume" element={<Resume />} />
// //               <Route path="*" element={<NotFound />} />
// //             </Routes>
// //             <ChatbotFab />
// //           </BrowserRouter>
// //         </TooltipProvider>
// //       </AuthProvider>
// //     </ThemeProvider>
// //   </QueryClientProvider>
// // );

// // export default App;


// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { AuthProvider } from "@/contexts/AuthContext";
// // import { ThemeProvider } from "@/contexts/ThemeContext";
// // import ProtectedRoute from "@/components/ProtectedRoute";
// // import Index from "./pages/Index";
// // import AdminPanel from "./pages/admin";
// // import AdminLogin from "./pages/admin/login";
// // import NotFound from "./pages/NotFound";
// // import Resume from "./pages/Resume";
// // import ChatbotFab from "@/components/ChatbotFab";
// // import "@/lib/fontawesome"; // This runs only once!

// // const queryClient = new QueryClient();

// // const App = () => (
// //   <QueryClientProvider client={queryClient}>
// //     <ThemeProvider>
// //       <AuthProvider>
// //         <TooltipProvider>
// //           <Toaster />
// //           <Sonner />
// //           <BrowserRouter basename="/">
// //             <Routes>
// //               <Route path="/" element={<Index />} />
// //               <Route path="/admin/login" element={<AdminLogin />} />
// //               <Route path="/admin" element={
// //                 <ProtectedRoute requireAdmin={true}>
// //                   <AdminPanel />
// //                 </ProtectedRoute>
// //               } />
// //               <Route path="/resume" element={<Resume />} />
// //               <Route path="*" element={<NotFound />} />
// //             </Routes>
// //             <ChatbotFab />
// //           </BrowserRouter>
// //         </TooltipProvider>
// //       </AuthProvider>
// //     </ThemeProvider>
// //   </QueryClientProvider>
// // );

// // export default App;
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { HashRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { ThemeProvider } from "@/contexts/ThemeContext";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import Index from "./pages/Index";
// import AdminPanel from "./pages/admin";
// import AdminLogin from "./pages/admin/login";
// import NotFound from "./pages/NotFound";
// import Resume from "./pages/Resume";
// import ChatbotFab from "@/components/ChatbotFab";
// import "@/lib/fontawesome"; // This runs only once!

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider>
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           {/* 👇 Important: basename must match your GitHub repo name */}
//           <HashRouter>
//   <Routes>
//     <Route path="/" element={<Index />} />
//     <Route path="/admin/login" element={<AdminLogin />} />
//     <Route
//       path="/admin"
//       element={
//         <ProtectedRoute requireAdmin={true}>
//           <AdminPanel />
//         </ProtectedRoute>
//       }
//     />
//     <Route path="/resume" element={<Resume />} />
//     <Route path="*" element={<NotFound />} />
//   </Routes>
//   <ChatbotFab />
// </HashRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // ✅ Use HashRouter
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AdminPanel from "./pages/admin";
import AdminLogin from "./pages/admin/login";
import NotFound from "./pages/NotFound";
import Resume from "./pages/Resume";
import ChatbotFab from "@/components/ChatbotFab";
import "@/lib/fontawesome"; // This runs only once!

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* ✅ HashRouter ensures GitHub Pages routing works */}
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatbotFab />
          </HashRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


