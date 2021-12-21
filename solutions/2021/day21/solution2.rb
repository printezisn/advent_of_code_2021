def dice_sum_occurences
  h = Hash.new { 0 }

  (1..3).each do |i|
    (1..3).each do |j|
      (1..3).each do |k|
        h[i + j + k] += 1
      end
    end
  end

  h
end

def total_wins(player_positions, player_scores = [0, 0], player = 0, cache = {})
  return [1, 0] if player_scores[0] >= 21
  return [0, 1] if player_scores[1] >= 21

  cache_key = player_positions + player_scores + [player]

  cache[cache_key] ||= (3..9).each_with_object([0, 0]) do |dices, acc|
    player_new_positions = player_positions.dup
    player_new_positions[player] = (player_new_positions[player] + dices) % 10

    player_new_scores = player_scores.dup
    player_new_scores[player] += player_new_positions[player] + 1

    result = total_wins(player_new_positions, player_new_scores, (player + 1) % 2, cache)

    acc[0] += result[0] * $dice_sum_occurences[dices]
    acc[1] += result[1] * $dice_sum_occurences[dices]
  end
end

$dice_sum_occurences = dice_sum_occurences

lines = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines
player1_position = /Player 1 starting position: (\d+)/.match(lines[0]).to_a[1].to_i - 1
player2_position = /Player 2 starting position: (\d+)/.match(lines[1]).to_a[1].to_i - 1

puts total_wins([player1_position, player2_position]).max
