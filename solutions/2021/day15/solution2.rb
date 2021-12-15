max_offset = 5

array = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map do |line|
  line.chomp.chars.map(&:to_i) * max_offset
end * max_offset
array.map!(&:dup)

total_rows = array.size
total_cols = array[0].size

array.each_with_index do |row, i|
  row.each_with_index do |col, j|
    offset = i / (total_rows / max_offset) + j / (total_cols / max_offset)
    offset.times do
      col += 1
      col = 1 if col > 9
    end

    array[i][j] = col
  end
end

risk_levels = {}
path_weights = {}

array.each_with_index do |row, i|
  row.each_with_index do |col, j|
    risk_levels[[i, j]] = col
    path_weights[[i, j]] = i.zero? && j.zero? ? 0 : Float::INFINITY
  end
end

nodes = { [0, 0] => true }

until nodes.empty?
  current = nodes.keys.min_by { |node| path_weights[node] }
  next unless current

  nodes.delete(current)

  [
    [current[0] - 1, current[1]],
    [current[0] + 1, current[1]],
    [current[0], current[1] - 1],
    [current[0], current[1] + 1]
  ].each do |neighbour|
    next unless path_weights[neighbour]

    new_weight = path_weights[current] + risk_levels[neighbour]
    if new_weight < path_weights[neighbour]
      path_weights[neighbour] = new_weight
      nodes[neighbour] = true
    end
  end
end

puts path_weights[[total_rows - 1, total_cols - 1]]
