import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import PersonalData from "./pages/PersonalData";
import Dashboard from "./pages/Dashboard";
import Options from "./pages/Options";
import ChatAI from "./pages/ChatAI";
import Pharmacies from "./pages/Pharmacies";
import PharmacyProducts from "./pages/PharmacyProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Tracking from "./pages/Tracking";
import Symptoms from "./pages/Symptoms";
import SymptomMedicines from "./pages/SymptomMedicines";
import MedicineDetails from "./pages/MedicineDetails";
import CartSymptom from "./pages/CartSymptom";
import TrackingSymptom from "./pages/TrackingSymptom";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import GoogleAuth from "./pages/GoogleAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/google-auth" element={<GoogleAuth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/personal-data" element={<PersonalData />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/options" element={<Options />} />
          <Route path="/chat-ai" element={<ChatAI />} />
          <Route path="/pharmacies" element={<Pharmacies />} />
          <Route path="/pharmacy/:id" element={<PharmacyProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/symptom-medicines/:id" element={<SymptomMedicines />} />
          <Route path="/medicine-details/:id" element={<MedicineDetails />} />
          <Route path="/cart-symptom" element={<CartSymptom />} />
          <Route path="/tracking-symptom" element={<TrackingSymptom />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
