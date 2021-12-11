def board_complete?(board)
  row_sums = []
  col_sums = []

  board.each_with_index do |row, row_index|
    row.each_with_index do |col, col_index|
      row_sums[row_index] ||= 0
      col_sums[col_index] ||= 0

      row_sums[row_index] += col
      col_sums[col_index] += col
    end
  end

  row_sums.any?(&:zero?) || col_sums.any?(&:zero?)
end

def detect_complete_board(boards)
  boards.detect { |board| board_complete?(board) }
end

def mark_number_in_board(board, num)
  board.each_with_index do |row, row_index|
    row.each_with_index do |col, col_index|
      board[row_index][col_index] = 0 if board[row_index][col_index] == num
    end
  end
end

def mark_number(boards, num)
  boards.each { |board| mark_number_in_board(board, num) }
end

lines = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map(&:chomp).select { |line| line != '' }

bingo_numbers = lines[0].split(',').map(&:to_i)
boards = []

lines.drop(1).each_with_index do |line, line_index|
  board_index = line_index / 5

  boards[board_index] ||= []
  boards[board_index] << line.split.map(&:to_i)
end

complete_board = nil
last_number = nil

bingo_numbers.each do |bingo_number|
  last_number = bingo_number
  mark_number(boards, last_number)

  complete_board = detect_complete_board(boards)
  break if complete_board
end

puts complete_board.sum(&:sum) * last_number