import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { ContentProvider } from "@/context/ContentContext";
import { AuthProvider } from "@/context/AuthContext";
import { AdminRoute } from "@/components/admin/AdminRoute";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import CollectionsPage from "@/pages/CollectionsPage";
import CollectionDetailPage from "@/pages/CollectionDetailPage";
import KakoPorucitiPage from "@/pages/KakoPorucitiPage";
import PolitikaPrivatnostiPage from "@/pages/PolitikaPrivatnostiPage";
import KontaktPage from "@/pages/KontaktPage";
import ONamaPage from "@/pages/ONamaPage";
import FAQPage from "@/pages/FAQPage";
import DostavaPovratPage from "@/pages/DostavaPovratPage";
import UsloviKoriscenjaPage from "@/pages/UsloviKoriscenjaPage";
import NotFound from "@/pages/NotFound";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminHomepagePage from "@/pages/admin/AdminHomepagePage";
import AdminCollectionsPage from "@/pages/admin/AdminCollectionsPage";
import AdminPagesPage from "@/pages/admin/AdminPagesPage";
import AdminThemePage from "@/pages/admin/AdminThemePage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContentProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CartProvider>
              <Routes>
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="homepage" element={<AdminHomepagePage />} />
                  <Route path="collections" element={<AdminCollectionsPage />} />
                  <Route path="pages" element={<AdminPagesPage />} />
                  <Route path="theme" element={<AdminThemePage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>

                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/collections" element={<CollectionsPage />} />
                  <Route path="/collections/:slug" element={<CollectionDetailPage />} />
                  <Route path="/kako-poruciti" element={<KakoPorucitiPage />} />
                  <Route path="/politika-privatnosti" element={<PolitikaPrivatnostiPage />} />
                  <Route path="/kontakt" element={<KontaktPage />} />
                  <Route path="/o-nama" element={<ONamaPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/dostava-i-povrat" element={<DostavaPovratPage />} />
                  <Route path="/uslovi-koriscenja" element={<UsloviKoriscenjaPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </CartProvider>
          </BrowserRouter>
        </AuthProvider>
      </ContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
