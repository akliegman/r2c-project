import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const mockData = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
];

test("loads page", async () => {
  // mock the API call
  jest.mock("./api/photosApi", () => ({
    getPhotos: () => Promise.resolve(mockData),
  }));

  render(<App />);

  const loadingText = "Loading...";

  expect(screen.getByText(loadingText)).toBeInTheDocument();

  await waitFor(() => {
    const loadingPrompt = screen.queryByText(loadingText);

    expect(loadingPrompt).not.toBeInTheDocument();
  });
});

test("loads photos from API", async () => {
  // mock the API call
  jest.mock("./api/photosApi", () => ({
    getPhotos: () => Promise.resolve(mockData),
  }));
  render(<App />);

  await waitFor(() => {
    const image = screen.getByAltText(
      "accusamus beatae ad facilis cum similique qui sunt"
    );
    expect(image).toBeInTheDocument();
  });
});

test("clicking photo opens modal", async () => {
  // mock the API call
  jest.mock("./api/photosApi", () => ({
    getPhotos: () => Promise.resolve(mockData),
  }));
  render(<App />);

  await waitFor(() => {
    const image = screen.getByAltText(
      "accusamus beatae ad facilis cum similique qui sunt"
    );
    expect(image).toBeInTheDocument();
    image.click();
  });

  await waitFor(() => {
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });
});

test("clicking close button closes modal", async () => {
  // mock the API call
  jest.mock("./api/photosApi", () => ({
    getPhotos: () => Promise.resolve(mockData),
  }));
  render(<App />);

  await waitFor(() => {
    const image = screen.getByAltText(
      "accusamus beatae ad facilis cum similique qui sunt"
    );
    expect(image).toBeInTheDocument();
    image.click();
  });

  await waitFor(() => {
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    const closeButton = screen.getByRole("button", { name: "Close" });
    closeButton.click();
  });

  await waitFor(() => {
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });
});

test("clicking delete button deletes photo", async () => {
  // mock the API call
  jest.mock("./api/photosApi", () => ({
    getPhotos: () => Promise.resolve(mockData),
  }));
  render(<App />);

  await waitFor(() => {
    const image = screen.getByAltText(
      "accusamus beatae ad facilis cum similique qui sunt"
    );
    expect(image).toBeInTheDocument();
    image.click();
  });

  await waitFor(() => {
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    deleteButton.click();
  });

  await waitFor(() => {
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
    const image = screen.queryByAltText(
      "accusamus beatae ad facilis cum similique qui sunt"
    );
    expect(image).not.toBeInTheDocument();
  });
});

test("clicking move button opens move dropdown", async () => {
  // mock the API call
  jest.mock("./api/photosApi", () => ({
    getPhotos: () => Promise.resolve(mockData),
  }));
  render(<App />);

  await waitFor(() => {
    const image = screen.getByAltText("reprehenderit est deserunt velit ipsam");
    expect(image).toBeInTheDocument();
    image.click();
  });

  await waitFor(() => {
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    const moveButton = screen.getByRole("button", { name: "Move" });
    moveButton.click();
  });

  await waitFor(() => {
    const dropdown = screen.getByRole("listbox");
    expect(dropdown).toBeInTheDocument();
  });
});

// TODO: test moving photo to another album
// TODO: test sidebar navigation
