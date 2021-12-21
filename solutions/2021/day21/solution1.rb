lines = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines
player1_position = /Player 1 starting position: (\d+)/.match(lines[0]).to_a[1].to_i - 1
player2_position = /Player 2 starting position: (\d+)/.match(lines[1]).to_a[1].to_i - 1

player1_run = 6
player2_run = 15

player1_position = (player1_position + player1_run) % 10
player2_position = (player2_position + player2_run) % 10

score1 = player1_position + 1
score2 = player2_position + 1
dice_rolls = 6

loop do
  dice_rolls += 3
  player1_run += 18
  player1_position = (player1_position + player1_run) % 10
  score1 += player1_position + 1

  if score1 >= 1000
    puts score2 * dice_rolls
    break
  end

  dice_rolls += 3
  player2_run += 18
  player2_position = (player2_position + player2_run) % 10
  score2 += player2_position + 1

  if score2 >= 1000
    puts score1 * dice_rolls
    break
  end
end
