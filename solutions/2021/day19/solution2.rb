def rotation_types
  types = []

  (-3..3).each do |x|
    next if x.zero?

    (-3..3).each do |y|
      next if y.zero? || y.abs == x.abs

      (-3..3).each do |z|
        next if z.zero? || z.abs == x.abs || z.abs == y.abs

        types << [x, y, z]
      end
    end
  end

  types
end

def rotate(position, type)
  3.times.map do |i|
    position[type[i].abs - 1] * (type[i].positive? ? 1 : -1)
  end
end

def position_offset(position1, position2)
  3.times.map { |i| position2[i] - position1[i] }
end

def rotate_scanner(scanner, rotation)
  scanner.map { |position| rotate(position, rotation) }
end

def add_offset_to_beacons(scanner, offset)
  scanner.map do |position|
    3.times.map { |i| position[i] + offset[i] }
  end
end

def scanner_positions(scanner1, scanner2)
  rotation_types.each do |rotation|
    offsets = Hash.new { 0 }
    scanner2_beacons = rotate_scanner(scanner2, rotation)

    scanner1.each do |beacon1|
      scanner2_beacons.each do |beacon2|
        offset = position_offset(beacon2, beacon1)
        offsets[offset] += 1

        return [offset, rotation] if offsets[offset] >= 12
      end
    end
  end

  nil
end

scanners = []

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  line = line.chomp
  next if line.empty?

  if line.start_with?('---')
    scanners << []
    next
  end

  scanners.last << line.split(',').map { |part| part.strip.to_i }
end

scanner_positions = [nil] * scanners.size
scanner_positions[0] = [nil, [0, 0, 0], [1, 2, 3]]
remaining = scanners.size - 1

while remaining.positive?
  (0...scanners.size).each do |i|
    next unless scanner_positions[i]

    (0...scanners.size).each do |j|
      next if scanner_positions[j] || i == j

      position = scanner_positions(scanners[i], scanners[j])
      next unless position

      scanner_positions[j] = [i] + position
      remaining -= 1
    end
  end
end

sanitized_scanner_positions = []

scanners.each_with_index do |scanner, i|
  parent, absolute_position, _ = scanner_positions[i]

  while parent
    parent, position, rotation = scanner_positions[parent]

    absolute_position = rotate(absolute_position, rotation)
    3.times.each { |j| absolute_position[j] += position[j] }
  end
 
  sanitized_scanner_positions << absolute_position
end

max_manhattan_distance = 0

(0...scanners.size).each do |i|
  (i + 1...scanners.size).each do |j|
    manhattan_distance = 3.times.sum { |k| (sanitized_scanner_positions[i][k] - sanitized_scanner_positions[j][k]).abs }
    max_manhattan_distance = [max_manhattan_distance, manhattan_distance].max
  end
end

puts max_manhattan_distance