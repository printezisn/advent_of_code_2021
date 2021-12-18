def calculate_max_y(target_min_y, target_max_y)
  y = -target_min_y + 1

  loop do
    position = y * (y + 1) / 2
    offset = 1
  
    while position >= target_min_y
      return y if position <= target_max_y && position >= target_min_y
  
      position -= offset
      offset += 1
    end

    y -= 1
  end
end

line = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.first
target_min_x, target_max_x, target_min_y, target_max_y = line.match(/x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/).to_a.drop(1).map(&:to_i)

max_y = calculate_max_y(target_min_y, target_max_y)

puts max_y * (max_y + 1) / 2