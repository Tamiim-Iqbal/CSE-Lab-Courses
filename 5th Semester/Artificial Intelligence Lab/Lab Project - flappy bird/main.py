import pygame
from random import randint
pygame.init()

# Set up display and initialize variables
display = pygame.display.set_mode((320, 568))
text = pygame.font.Font(None, 50)
bg = pygame.image.load('bg.png')
bird = pygame.image.load('bird.png')

pole_width = 69
pole_gap = 150
pole_x = 320
top_pole_height = randint(100, 400)
pole_colour = (220, 85, 57)

bird_x = 20
bird_y = top_pole_height + 20
score = 0
clock = pygame.time.Clock()

# Main game loop
while True:
    pygame.event.get()
    keys = pygame.key.get_pressed()

    # Increase speed after score reaches 150
    if score >= 150:
        pole_speed = 3         
        bird_up_speed = 4      
        bird_down_speed = 4    
    elif score >= 300:
        pole_speed = 4
        bird_up_speed = 5      
        bird_down_speed = 5    
    else:
        pole_speed = 2  
        bird_up_speed = 3  
        bird_down_speed = 3  

    # Bird movement
    if keys[pygame.K_UP]:
        bird_y = bird_y - bird_up_speed
    elif keys[pygame.K_DOWN]:
        bird_y = bird_y + bird_down_speed

    # Update background and bird position
    display.blit(bg, (0, 0))
    display.blit(bird, (bird_x, bird_y))

    # Update poles position
    pole_x = pole_x - pole_speed
    if pole_x <= -pole_width:
        pole_x = 320
        top_pole_height = randint(100, 400)
        score = score + 20

    # Draw poles
    pygame.draw.rect(display, pole_colour, (pole_x, 0, pole_width, top_pole_height))
    pygame.draw.rect(display, pole_colour, (pole_x, top_pole_height + pole_gap, pole_width, 568))

    # Collision detection
    if pole_x <= bird_x + 50 and bird_x <= pole_x + pole_width:
        if bird_y <= top_pole_height or bird_y + 50 >= top_pole_height + pole_gap:
            print('Game Over!')
            break  # End the game loop

    # Render score
    score_text = text.render(f'Score: {score}', True, (255, 255, 255))
    display.blit(score_text, (0, 0))

    pygame.display.update()
    clock.tick(100)

# Display the final result
display.blit(bg, (0, 0))  
final_score_text = text.render(f'Final Score: {score}', True, (255, 255, 255))
game_over_text = text.render('Game Over!', True, (255, 0, 0))
display.blit(final_score_text, (50, 250))
display.blit(game_over_text, (70, 300))
pygame.display.update()

# Wait for a few seconds before quitting
pygame.time.wait(3000)
pygame.quit()
