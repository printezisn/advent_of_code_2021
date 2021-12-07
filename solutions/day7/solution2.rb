positions = File.read(File.join(File.dirname(__FILE__), 'input.txt')).split(',').map(&:to_i)

min_fuel = -1
(positions.min..positions.max).each do |point|
  point_fuel = 0

  positions.each do |position|
    diff = (point - position).abs
    point_fuel += (diff * (diff + 1)) / 2
  end

  min_fuel = point_fuel if min_fuel == -1 || point_fuel < min_fuel
end

puts min_fuel