horizontal_position = 0
depth = 0
aim = 0

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |command|
  type, num = command.split

  case type
  when 'forward'
    horizontal_position += num.to_i
    depth += (aim * num.to_i)
  when 'up'
    aim -= num.to_i
  when 'down'
    aim += num.to_i
  end
end

puts horizontal_position * depth