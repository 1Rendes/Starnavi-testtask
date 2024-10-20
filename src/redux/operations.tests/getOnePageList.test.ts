import { getOnePageList } from "../operations";
import { fetchData } from "../../api/fetchData";
import { configureStore } from "@reduxjs/toolkit";
import { stateReducer } from "../slice";

jest.mock("../../api/fetchData.ts");

const mockStore = configureStore({
  reducer: { state: stateReducer },
});

describe("getOnePageList", () => {
  it("dispatches fulfilled action and returns data when API request succeeds", async () => {
    const mockData = {
      results: [
        { id: 10, name: "Obi-Wan Kenobi" },
        { id: 12, name: "Wilhuff Tarkin" },
      ],
    };
    (fetchData as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await mockStore.dispatch(
      getOnePageList({ endpoint: "people", page: 1 })
    );

    expect(result.type).toBe("getOnePageList/fulfilled");
    expect(result.payload).toEqual(mockData.results);
  });

  it("dispatches rejected action when API request fails", async () => {
    const mockError = new Error("API Error");
    (fetchData as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await mockStore.dispatch(
      getOnePageList({ endpoint: "people", page: 1 })
    );

    expect(result.type).toBe("getOnePageList/rejected");
    expect(result.payload).toEqual({ message: mockError.message });
  });
});
