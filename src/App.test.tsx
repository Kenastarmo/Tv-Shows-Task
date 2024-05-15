import { render, screen, fireEvent} from "@testing-library/react";
//import { useDebounce } from "use-debounce";
//import userEvent from '@testing-library/user-event';
import App from "./App";

describe("App komponenta", () => {

    it("Rendering buttons", () => {
        render(<App />)

        const moviesButton = screen.getByText("Movies");
        const tvShowButton = screen.getByText("TV Shows");

        expect(moviesButton).toBeInTheDocument();
        expect(tvShowButton).toBeInTheDocument();
    })

    it("Changing category", () => {
        render(<App />)

        fireEvent.click(screen.getByText("Movies"))
        expect(localStorage.getItem("category")).toBe("movie")

        fireEvent.click(screen.getByText("TV Shows"))
        expect(localStorage.getItem("category")).toBe("tv")

    })

    // it("Testing input field", async () => {
    //     render(<App />)


    //     const inputField = screen.getByPlaceholderText("search...");
    //     fireEvent.change(inputField, { target: {value: "test"}});

    //     await waitFor(() => {
    //         const updatedInput = screen.getByDisplayValue("test");
    //         expect(updatedInput).toBeInTheDocument();
    //     })
        

    // })

  


})