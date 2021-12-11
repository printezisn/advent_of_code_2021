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

def assign_basin(array, row, col, basin, assigned_spots)
  return if array[row][col] == 9 || assigned_spots.include?([row, col])

  assigned_spots << [row, col]
  basin << [row, col]

  adjacent_spots(array, row, col).each do |adj_row, adj_col|
    assign_basin(array, adj_row, adj_col, basin, assigned_spots) if array[adj_row][adj_col] > array[row][col]
  end
end

array = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map do |line|
  line.chomp.chars.map(&:to_i)
end

assigned_spots = []
basins = []

(0...array.size).each do |row|
  (0...array[row].size).each do |col|
    next unless low_point?(array, row, col)

    new_basin = []
    basins << new_basin

    assign_basin(array, row, col, new_basin, assigned_spots)
  end
end

result = basins.map(&:size).sort.reverse.first(3).reduce(&:*)

puts result