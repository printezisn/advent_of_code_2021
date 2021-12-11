def adjacent_spots(array, row, col)
  [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, 1], [1, -1], [-1, -1], [1, 1]].map do |adj_row, adj_col|
    next if row + adj_row < 0 || row + adj_row >= array.size || col + adj_col < 0 || col + adj_col >= array[row].size

    [row + adj_row, col + adj_col]
  end.compact
end

def total_occupied_adjacent_spots(array, row, col)
  adjacent_spots(array, row, col).count { |adj_row, adj_col| array[adj_row][adj_col] == '#' }
end

array = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map { |line| line.chomp.chars }

state_changed = true

while state_changed do
  state_changed = false
  new_array = []

  (0...array.size).each do |i|
    new_array << []

    (0...array[i].size).each do |j|
      if array[i][j] == 'L' && total_occupied_adjacent_spots(array, i, j) == 0
        new_array[i][j] = '#'
        state_changed = true
      elsif array[i][j] == '#' && total_occupied_adjacent_spots(array, i, j) >= 4
        new_array[i][j] = 'L'
        state_changed = true
      else
        new_array[i][j] = array[i][j]
      end
    end
  end

  array = new_array
end

puts array.flatten.count { |char| char == '#' }
