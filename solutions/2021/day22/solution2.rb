def intersection(range1, range2)
  intersected_range = []

  (0..2).each do |i|
    if range1[i][0] <= range2[i][0] && range1[i][1] >= range2[i][0]
      intersected_range << [range2[i][0], [range1[i][1], range2[i][1]].min]
    elsif range2[i][0] <= range1[i][0] && range2[i][1] >= range1[i][0]
      intersected_range << [range1[i][0], [range1[i][1], range2[i][1]].min]
    else
      return
    end
  end

  intersected_range
end

def total_range_cubes(range)
  range.map { |min, max| max - min + 1 }.reduce(:*)
end

def total_unique_range_cubes(ranges, index)
  intersections = []

  (index + 1...ranges.size).each do |i|
    intersection = intersection(ranges[index], ranges[i])
    intersections << intersection if intersection
  end

  total_cubes = total_range_cubes(ranges[index])
  (0...intersections.size).each do |i|
    total_cubes -= total_unique_range_cubes(intersections, i)
  end

  total_cubes
end

ranges = []
off_ranges = {}

File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.each_with_index do |line, i|
  off_ranges[i] = true if line.start_with?('off')

  min_x, max_x, min_y, max_y, min_z, max_z =
    /x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/.match(line.chomp).to_a.drop(1).map(&:to_i)

  ranges << [[min_x, max_x], [min_y, max_y], [min_z, max_z]]
end

total_on_cubes = 0

(0...ranges.size).each do |i|
  next if off_ranges[i]

  total_on_cubes += total_unique_range_cubes(ranges, i)
end

puts total_on_cubes
