import { fireEvent, render, screen } from "@testing-library/react-native";
import MyButton from "../components/MyButton";

describe("MyButton", () => {
  it("should call onPress function when the button is pressed", () => {
    // Create a mock function to simulate the onPress handler
    // jest.fn() creates a mock function that records how it is called during a test
    const mockOnPress = jest.fn();

    // Render the button component with the mock function
    const { getByTestId } = render(<MyButton onPress={mockOnPress} />);
    // Find the button element using its testID
    const pressMeButton = getByTestId("MyButton:Button:ClickMe");
    // Simulate a press event on the button
    fireEvent.press(pressMeButton);

    // Assert that the mock function was called
    expect(mockOnPress).toHaveBeenCalled();
  });
});

// Alternative version using screen object for queries:
/*
render(<MyButton onPress={mockOnPress} />);
const pressMeButton = screen.getByTestId("MyButton:Button:ClickMe");
fireEvent.press(pressMeButton);
*/
