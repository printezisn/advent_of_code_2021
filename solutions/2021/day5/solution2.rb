points = {}

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  p1, p2 = line.split('->').map(&:chomp)
  x1, y1 = p1.split(',').map(&:to_i)
  x2, y2 = p2.split(',').map(&:to_i)

  while x1 != x2 || y1 != y2
    points[[x1, y1]] ||= 0
    points[[x1, y1]] += 1

    x1 += 1 if x1 < x2
    x1 -= 1 if x1 > x2
    y1 += 1 if y1 < y2
    y1 -= 1 if y1 > y2
  end

  points[[x1, y1]] ||= 0
  points[[x1, y1]] += 1
end

pp points.values.count { |value| value >= 2 }