def adjacent_spots(array, row, col)
  [[-1, 0], [1, 0], [0, -1], [0, 1]].map do |adj_row, adj_col|
    if row + adj_row < 0 || row + adj_row >= array.size ||
       col + adj_col < 0 || col + adj_col >= array[row].size
      next
    end

    [row + adj_row, col + adj_col]
  end.compact
end

def low_point?(array, row, col)
  array[row][col] < adjacent_spots(array, row, col).map { |adj_row, adj_col| array[adj_row][adj_col] }.min
end

array = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map do |line|
  line.chomp.chars.map(&:to_i)
end

risk_level = 0

(0...array.size).each do |row|
  (0...array[row].size).each do |col|
    risk_level += (array[row][col] + 1) if low_point?(array, row, col)
  end
end

puts risk_level