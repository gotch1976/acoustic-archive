import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ListingPage } from "./pages/ListingPage";
import { FacilityPage } from "./pages/FacilityPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ListingPage />} />
        <Route path=":facilitySlug" element={<FacilityPage />} />
      </Route>
    </Routes>
  );
}

export default App;
