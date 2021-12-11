horizontal_position = 0
depth = 0

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |command|
  type, num = command.split

  case type
  when 'forward'
    horizontal_position += num.to_i
  when 'up'
    depth -= num.to_i
  when 'down'
    depth += num.to_i
  end
end

puts horizontal_position * depth