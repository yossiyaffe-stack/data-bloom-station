import { useState, useCallback, useMemo } from "react";

export type ModalKey = 
  | "seasons" | "subtypes" | "colors" | "fabrics" | "gemstones" 
  | "artists" | "eras" | "paintings" | "sephirot" | "makeup" 
  | "metals" | "designers" | "prints" | "bodyTypes"
  | "completionStatus" | "junctionMappings"
  | "seasonDetail" | "phaseAssignment"
  | "makeupMappings" | "fabricMappings" | "eraMappings" 
  | "designerMappings" | "gemstoneMappings" | "artistMappings" | "metalMappings"
  // Lifestyle tables
  | "occasions" | "styleIcons" | "faceShapes" | "faceShapeRecommendations"
  | "interiorDesigns" | "seasonalDressing" | "alternateSeasons"
  | "culturalClothing" | "naturePhotos" | "eraPhotos" | "outfitLinks"
  | "subtypeAccentColors" | "occasionOutfitMappings" | "styleIconMappings";

export function useModalState() {
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);

  const openModalHandler = useCallback((key: ModalKey) => {
    setOpenModal(key);
  }, []);

  const openSeasonDetail = useCallback((seasonId: string) => {
    setSelectedSeasonId(seasonId);
    setOpenModal("seasonDetail");
  }, []);

  const closeModal = useCallback(() => {
    setOpenModal(null);
    setSelectedSeasonId(null);
  }, []);

  const isOpen = useCallback((key: ModalKey) => openModal === key, [openModal]);

  const getOpenChange = useCallback(
    (key: ModalKey) => (open: boolean) => {
      if (open) setOpenModal(key);
      else if (openModal === key) {
        setOpenModal(null);
        if (key === "seasonDetail") setSelectedSeasonId(null);
      }
    },
    [openModal]
  );

  // Map stat titles to modal keys
  const titleToModalKey: Record<string, ModalKey> = useMemo(() => ({
    "Seasons": "seasons",
    "Subtypes": "subtypes",
    "Colors": "colors",
    "Fabrics": "fabrics",
    "Gemstones": "gemstones",
    "Artists": "artists",
    "Historical Eras": "eras",
    "Masterpieces": "paintings",
    "Sephirot Colors": "sephirot",
    "Makeup": "makeup",
    "Metals": "metals",
    "Designers": "designers",
    "Prints": "prints",
    "Body Types": "bodyTypes",
    // Lifestyle tables
    "Occasions": "occasions",
    "Style Icons": "styleIcons",
    "Face Shapes": "faceShapes",
    "Face Recommendations": "faceShapeRecommendations",
    "Interior Designs": "interiorDesigns",
    "Seasonal Guides": "seasonalDressing",
    "Alternate Seasons": "alternateSeasons",
    "Cultural Clothing": "culturalClothing",
    "Nature Photos": "naturePhotos",
    "Era Photos": "eraPhotos",
    "Outfit Links": "outfitLinks",
    "Accent Colors": "subtypeAccentColors",
  }), []);

  const getClickHandler = useCallback(
    (title: string) => {
      const key = titleToModalKey[title];
      if (key) return () => openModalHandler(key);
      return undefined;
    },
    [titleToModalKey, openModalHandler]
  );

  return {
    openModal,
    openModalHandler,
    openSeasonDetail,
    selectedSeasonId,
    closeModal,
    isOpen,
    getOpenChange,
    getClickHandler,
  };
}
