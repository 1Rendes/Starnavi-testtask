import { getFilmsData } from "../operations";
import { fetchData } from "../../api/fetchData";
import { configureStore } from "@reduxjs/toolkit";
import { stateReducer } from "../slice";
jest.mock("../../api/fetchData.ts");

const mockStore = configureStore({
  reducer: { state: stateReducer },
});

describe("getFilmsData", () => {
  it("dispatches fulfilled action and returns films data when API request succeeds", async () => {
    const mockData = {
      results: [
        { id: 1, title: "A New Hope" },
        { id: 2, title: "The Empire Strikes Back" },
        { id: 3, title: "Return of the Jedi" },
        { id: 4, title: "The Phantom Menace" },
        { id: 5, title: "Attack of the Clones" },
        { id: 6, title: "Revenge of the Sith" },
      ],
    };

    (fetchData as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await mockStore.dispatch(getFilmsData("testEndpoint"));

    expect(result.type).toBe("getFilmsData/fulfilled");
    expect(result.payload).toEqual(mockData.results);
  });

  it("dispatches rejected action when API request fails", async () => {
    const mockError = new Error("API Error");
    (fetchData as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await mockStore.dispatch(getFilmsData("testEndpoint"));

    expect(result.type).toBe("getFilmsData/rejected");
    expect(result.payload).toEqual(
      expect.objectContaining({ message: mockError.message })
    );
  });
});
