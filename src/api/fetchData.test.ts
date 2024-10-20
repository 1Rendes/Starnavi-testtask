import axios from "axios";
import { fetchData } from "./fetchData";
import { Character, Films } from "../types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchData", () => {
  it("should fetch data successfully", async () => {
    const mockData = {
      results: [
        {
          id: 1,
          name: "Luke Skywalker",
        },
      ],
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const endpoint = "test-endpoint";
    const films = "1,2,3";
    const characterId = "10";
    const page = 1;
    const characters: Character[] = [];

    const result = await fetchData(
      endpoint,
      films,
      characterId,
      page,
      characters
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(endpoint, {
      params: { films__in: films, pilots: characterId, page, characters },
    });
    expect(result).toEqual(mockData);
  });

  it("should handle errors correctly", async () => {
    const mockError = new Error("Network Error");
    mockedAxios.get.mockRejectedValue(mockError);

    const endpoint = "test-endpoint";

    const result = await fetchData(endpoint);

    expect(mockedAxios.get).toHaveBeenCalledWith(endpoint, {
      params: {
        films__in: undefined,
        pilots: undefined,
        page: undefined,
        characters: undefined,
      },
    });
    expect(result).toEqual(mockError);
  });
});
