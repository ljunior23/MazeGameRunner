import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const numRows = 10;
const numCols = 10;

const LabyrinthGame = () => {
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    generateMaze();
  }, []);

  const generateMaze = () => {
    // Generate a random maze
    const newMaze = [];
    for (let row = 0; row < numRows; row++) {
      const newRow = [];
      for (let col = 0; col < numCols; col++) {
        newRow.push(Math.random() > 0.3 ? 0 : 1); // 30% chance of a wall
      }
      newMaze.push(newRow);
    }

    // Set the start and end positions
    newMaze[0][0] = 0; // Start position
    newMaze[numRows - 1][numCols - 1] = 2; // End position (with key)

    setMaze(newMaze);
    setPlayerPosition({ x: 0, y: 0 });
    setHasKey(false);
  };

  const movePlayer = (direction) => {
    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;

    switch (direction) {
      case 'up':
        newY = y - 1;
        break;
      case 'down':
        newY = y + 1;
        break;
      case 'left':
        newX = x - 1;
        break;
      case 'right':
        newX = x + 1;
        break;
    }

    if (newX >= 0 && newX < numCols && newY >= 0 && newY < numRows && maze[newY][newX] !== 1) {
      setPlayerPosition({ x: newX, y: newY });
      
      // Check if the player collects the key
      if (newX === numCols - 1 && newY === numRows - 1 && maze[newY][newX] === 2) {
        setHasKey(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      {maze.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <View
              style={[
                styles.cell,
                playerPosition.x === cellIndex && playerPosition.y === rowIndex && styles.player,
                cell === 1 && styles.wall,
                cell === 2 && styles.key
              ]}
              key={cellIndex}
            />
          ))}
        </View>
      ))}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => movePlayer('up')}>
          <Text style={styles.button}>UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => movePlayer('left')}>
          <Text style={styles.button}>LEFT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => movePlayer('right')}>
          <Text style={styles.button}>RIGHT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => movePlayer('down')}>
          <Text style={styles.button}>DOWN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={generateMaze}>
          <Text style={styles.button}>RESET</Text>
        </TouchableOpacity>
      </View>
      {hasKey && <Text style={styles.message}>Congratulation! You found the key!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  },
  player: {
    backgroundColor: 'red'
  },
  wall: {
    backgroundColor: 'black'
  },
  key: {
    backgroundColor: 'yellow'
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'gray',
    marginRight: 10
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default LabyrinthGame;
