import { render, screen } from "@testing-library/react-native";
import MyGreeting from "../components/MyGreeting";

describe("MyGreeting", () => {
  it("should display Bonjour in French", () => {
    // Destructured query version (getByText extracted from render)
    const { getByText } = render(<MyGreeting ln="fr" name="Alice" />);
    // Quick existence check using toBeTruthy() (looser validation)
    expect(getByText("Bonjour Alice")).toBeTruthy();
  });

  it("should display Hola in Spanish", () => {
    // Screen object version (access queries via screen)
    render(<MyGreeting ln="es" name="Bob" />);
    expect(screen.getByText("Hola Bob")).toBeTruthy();
  });

  it("should display Hello in default language", () => {
    render(<MyGreeting ln="en" name="Charlie" />);
    expect(screen.getByText("Hello Charlie")).toBeTruthy();

    // Note: toBeOnTheScreen() requires @testing-library/react-native v12.4.0 or higher
    // expect(screen.getByText("Hello Charlie")).toBeOnTheScreen();
  });
});
