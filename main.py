from manim import *

class MyScene(Scene):
    def construct(self):
        # Title
        title = Text("How a Server Handles Multiple Clients", font_size=36).to_edge(UP)
        self.play(Write(title))

        # Server block
        server = Rectangle(width=2.5, height=1.5, color=BLUE).shift(LEFT * 3)
        server_text = Text("Server", font_size=24).move_to(server.get_center())
        server_group = VGroup(server, server_text)
        self.play(FadeIn(server_group))

        # Client blocks
        clients = VGroup()
        arrows = VGroup()
        for i in range(3):
            client = Rectangle(width=2, height=1, color=GREEN)
            client_text = Text(f"Client {i+1}", font_size=22).move_to(client.get_center())
            client_group = VGroup(client, client_text)
            client_group.move_to(RIGHT * 3 + DOWN * (i - 1) * 1.8)
            clients.add(client_group)

            arrow = Arrow(client_group.get_left(), server.get_right(), buff=0.1, color=YELLOW)
            arrows.add(arrow)

        self.play(LaggedStart(*[FadeIn(c) for c in clients], lag_ratio=0.4))
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.4))

        # Processing message
        processing = Text("Server handling requests...", font_size=24).next_to(server_group, DOWN)
        self.play(Write(processing))
        self.wait(2)

        # Finish
        self.play(*[FadeOut(mob) for mob in [clients, arrows, processing, server_group, title]])
