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
h_y = {}
max_turn = 0

(target_min_y..max_y).each do |y|
  turn = [y * 2 + 1, 0].max
  top = 0
  offset = y >= 0 ? -(y + 1) : y

  while top >= target_min_y
    if top <= target_max_y
      h_y[turn] ||= []
      h_y[turn] << y
    end

    top += offset
    offset -= 1
    turn += 1
  end

  max_turn = [max_turn, turn].max
end

pairs = {}

(1..target_max_x).each do |x|
  offset = x
  position = 0

  (1..max_turn).each do |turn|
    position += offset
    offset -= 1 if offset > 0

    next if position < target_min_x || position > target_max_x || !h_y[turn]

    h_y[turn].each { |y| pairs[[x, y]] = true }
  end
end

pp pairs.size