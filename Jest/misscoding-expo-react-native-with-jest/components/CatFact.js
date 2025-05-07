import { useState, useEffect } from "react";
import { Text } from "react-native";

export default CatFact = () => {
  const [catFactData, setCatFactData] = useState(undefined); // Initialize state to hold fetched cat facts

  // useEffect runs once on mount (empty dependency array)
  useEffect(() => {
    // Fetch data from external cat facts API
    fetch("https://cat-fact.herokuapp.com/facts")
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        // Save the result in state
        setCatFactData(data);
      });
  }, []);

  // Show loading text until the data is fetched
  if (catFactData === undefined) {
    return <Text>Loading...</Text>;
  }

  // If data exists and has at least one item, show the first fact
  // Otherwise, show fallback message
  return catFactData.length > 0 ? (
    <Text>{catFactData[0].text}</Text>
  ) : (
    <Text>No Cat Facts!</Text>
  );
};
