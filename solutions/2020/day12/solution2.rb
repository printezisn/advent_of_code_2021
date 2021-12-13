def rotate(position, degrees)
  while degrees > 0
    temp = position[0]
    position[0] = position[1]
    position[1] = -temp

    degrees -= 90
  end
end

direction_by_symbol = {
  'N' => [-1, 0],
  'E' => [0, 1],
  'S' => [1, 0],
  'W' => [0, -1]
}

current_waypoint_position = [-1, 10]
current_ship_position = [0, 0]

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |instruction|
  symbol = instruction[0]
  value = instruction[1..-1].to_i

  if direction_by_symbol.include?(symbol)
    (0...current_waypoint_position.size).each do |index|
      current_waypoint_position[index] += value * direction_by_symbol[symbol][index]
    end
  elsif symbol == 'L'
    rotate(current_waypoint_position, 360 - value)
  elsif symbol == 'R'
    rotate(current_waypoint_position, value)
  elsif symbol == 'F'
    (0...current_ship_position.size).each do |index|
      current_ship_position[index] += value * current_waypoint_position[index]
    end
  end
end

puts current_ship_position.map(&:abs).sum