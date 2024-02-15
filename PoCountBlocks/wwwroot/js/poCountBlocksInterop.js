// Initialize engine, renderer, and world variables
var engine, render, world;

// Define the initializePhysics function and attach it to the window object
window.initializePhysics = function (sceneElementId) {
    // Fetch the scene container
    var sceneElement = document.getElementById(sceneElementId);

    // Create an engine
    engine = Matter.Engine.create();
    world = engine.world;

    // Create a renderer
    render = Matter.Render.create({
        element: sceneElement,
        engine: engine,
        options: {
            width: 600,
            height: 400,
            wireframes: false
        }
    });

    // Run the engine
    Matter.Engine.run(engine);

    // Run the renderer
    Matter.Render.run(render);

    // Add walls (static bodies) to create a container
    var ground = Matter.Bodies.rectangle(300, 390, 610, 20, { isStatic: true });
    var leftWall = Matter.Bodies.rectangle(0, 200, 20, 400, { isStatic: true });
    var rightWall = Matter.Bodies.rectangle(600, 200, 20, 400, { isStatic: true });

    Matter.World.add(world, [ground, leftWall, rightWall]);
};

// Define the generateSquares function and attach it to the window object
window.generateSquares = function (numberOfSquares) {
    var squares = [];
    var delay = 1000 / numberOfSquares; // Calculate the delay between each square

    for (var i = 0; i < numberOfSquares; i++) {
        setTimeout(function () {
            // Create a square body at a random position in the middle 20% of the view
            var x = Math.random() * (0.2 * 600) + (0.4 * 600); // Spawn in the middle 20%
            var y = -30; // Start above the container to fall into view
            var size = 20; // Square size
            var square = Matter.Bodies.rectangle(x, y, size, size, { restitution: 0.5 });

            squares.push(square);

            // Add the square to the world
            Matter.World.add(world, square);
        }, i * delay); // Delay the creation of each square
    }

    // Assume squares have settled after a delay (adjust based on your game's dynamics)
    setTimeout(() => {
        DotNet.invokeMethodAsync('PoCountBlocks', 'NotifySquaresSettled');
    }, 5000 + delay * numberOfSquares); // Adjust this timeout based on the actual dynamics of your game
};

window.clearSquares = function () {
    Matter.World.clear(world, false);

    // Re-add ground and walls
    var ground = Matter.Bodies.rectangle(300, 390, 610, 20, { isStatic: true });
    var leftWall = Matter.Bodies.rectangle(0, 200, 20, 400, { isStatic: true });
    var rightWall = Matter.Bodies.rectangle(600, 200, 20, 400, { isStatic: true });

    Matter.World.add(world, [ground, leftWall, rightWall]);
};
// Replace 'YourBlazorAssemblyName' with the actual name of your Blazor project's assembly
