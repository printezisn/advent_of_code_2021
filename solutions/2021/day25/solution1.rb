lines = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map(&:chomp).reject(&:empty?)
rows = lines.size
cols = lines[0].size

right_cucumbers = {}
down_cucumbers = {}

(0...rows).each do |i|
  (0...cols).each do |j|
    case lines[i][j]
    when '>'
      right_cucumbers[[i, j]] = true
    when 'v'
      down_cucumbers[[i, j]] = true
    end
  end
end

has_changes = true
steps = 0

while has_changes do
  has_changes = false
  steps += 1

  moves = {}

  right_cucumbers.keys.each do |i, j|
    new_j = (j + 1) % cols
    next if right_cucumbers[[i, new_j]] || down_cucumbers[[i, new_j]]

    moves[[i, j]] = [i, new_j]
    has_changes = true
  end

  moves.each do |(i, j), (new_i, new_j)|
    right_cucumbers.delete([i, j])
    right_cucumbers[[new_i, new_j]] = true
  end

  moves = {}

  down_cucumbers.keys.each do |i, j|
    new_i = (i + 1) % rows
    next if right_cucumbers[[new_i, j]] || down_cucumbers[[new_i, j]]

    moves[[i, j]] = [new_i, j]
    has_changes = true
  end

  moves.each do |(i, j), (new_i, new_j)|
    down_cucumbers.delete([i, j])
    down_cucumbers[[new_i, new_j]] = true
  end
end

puts steps