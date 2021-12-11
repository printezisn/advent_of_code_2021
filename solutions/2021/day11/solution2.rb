def adjacent_spots(array, i, j)
  [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1], [-1, 1], [1, -1]].map do |row, col|
    next if row + i < 0 || row + i >= array.size || col + j < 0 || col + j >= array[i].size

    [row + i, col + j]
  end.compact
end

array = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map do |line|
  line.chomp.chars.map(&:to_i)
end

all_flash_step = 0
current_step = 0

loop do
  flashed = {}

  current_step += 1

  (0...array.size).each do |i|
    (0...array[i].size).each do |j|
      to_touch = [[i, j]]

      while !to_touch.empty?
        row, col = to_touch.shift
        next if flashed[[row, col]]

        array[row][col] += 1
        next if array[row][col] <= 9

        flashed[[row, col]] = true

        adjacent_spots(array, row, col).each { |adj_row, adj_col| to_touch << [adj_row, adj_col] }
      end
    end
  end

  if flashed.size == array.size * array[0].size
    all_flash_step = current_step
    break
  end

  flashed.keys.each { |i, j| array[i][j] = 0 }
end

puts all_flash_step