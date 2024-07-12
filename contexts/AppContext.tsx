"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Campus } from "@/lib/db/schema";

interface AppContextProps {
  selectedCampusId: Campus["id"] | null;
  setSelectedCampusId: React.Dispatch<
    React.SetStateAction<Campus["id"] | null>
  >;
  campuses: Campus[];
  selectedCampus: Campus | null | undefined;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [selectedCampusId, setSelectedCampusId] = useState<Campus["id"] | null>(
    null
  );
  const selectedCampus = useMemo(
    () =>
      selectedCampusId
        ? campuses.find((campus) => campus.id === selectedCampusId)
        : null,
    [selectedCampusId, campuses]
  );

  useEffect(() => {
    fetch("/api/campus")
      .then((res) => res.json())
      .then((data) => {
        setCampuses(data);
        setSelectedCampusId(data[0].id);
      });
  }, []);

  const value = useMemo(
    () => ({ selectedCampusId, setSelectedCampusId, campuses, selectedCampus }),
    [selectedCampusId, setSelectedCampusId, campuses, selectedCampus]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
