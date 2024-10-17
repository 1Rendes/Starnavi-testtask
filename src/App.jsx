import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ActorCard from "./components/ActorCard.jsx";
import HomePage from "./pages/HomePage.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:actorId" element={<ActorCard />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
