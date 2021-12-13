direction_by_degree = {
  0 => [-1, 0],
  90 => [0, 1],
  180 => [1, 0],
  270 => [0, -1]
}.freeze

direction_by_symbol = {
  'N' => [-1, 0],
  'E' => [0, 1],
  'S' => [1, 0],
  'W' => [0, -1]
}.freeze

current_degrees = 90
current_position = [0, 0]

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |instruction|
  symbol = instruction[0]
  value = instruction[1..-1].to_i

  if direction_by_symbol.include?(symbol)
    (0...current_position.size).each do |index|
      current_position[index] += value * direction_by_symbol[symbol][index]
    end
  elsif symbol == 'L'
    current_degrees -= value
    current_degrees = 360 + current_degrees if current_degrees < 0
  elsif symbol == 'R'
    current_degrees = (current_degrees + value) % 360
  elsif symbol == 'F'
    (0...current_position.size).each do |index|
      current_position[index] += value * direction_by_degree[current_degrees][index]
    end
  end
end

puts current_position.map(&:abs).sum