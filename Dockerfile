# Use Manim's official image
FROM manimcommunity/manim:stable

# Set working directory
WORKDIR /manim

# Copy current directory to container
COPY . .

# Set default command: render in low quality (change to -pqh for high quality)
CMD ["manim", "-ql", "main.py", "MyScene"]
