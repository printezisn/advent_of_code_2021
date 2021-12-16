def hex_to_binary(hex_str)
  map = {
    '0' => '0000',
    '1' => '0001',
    '2' => '0010',
    '3' => '0011',
    '4' => '0100',
    '5' => '0101',
    '6' => '0110',
    '7' => '0111',
    '8' => '1000',
    '9' => '1001',
    'A' => '1010',
    'B' => '1011',
    'C' => '1100',
    'D' => '1101',
    'E' => '1110',
    'F' => '1111'
  }

  hex_str.chars.map { |char| map[char] }.join
end

def handle_operation(type_id, values)
  case type_id
  when 0
    values.sum
  when 1
    values.reduce(:*)
  when 2
    values.min
  when 3
    values.max
  when 5
    values[0] > values[1] ? 1 : 0
  when 6
    values[0] < values[1] ? 1 : 0
  when 7
    values[0] == values[1] ? 1 : 0
  end
end

def handle_literal_value_packet(bin_num, start)
  version = bin_num[start..start + 2].to_i(2)
  value = ''

  start += 6
  while bin_num[start] == '1'
    value += bin_num[start + 1..start + 4]
    start += 5
  end

  value += bin_num[start + 1..start + 4]
  start += 5

  [version, value.to_i(2), start]
end

def handle_15_bit_operator(bin_num, start)
  version = bin_num[start..start + 2].to_i(2)
  type_id = bin_num[start + 3..start + 5].to_i(2)
  start += 7

  limit = start + 15 + bin_num[start..start + 14].to_i(2)
  start += 15
  values = []

  while start < limit
    new_version, value, new_start = handle_packet(bin_num, start)
    version += new_version
    values << value
    start = new_start
  end

  [version, handle_operation(type_id, values), start]
end

def handle_11_bit_operator(bin_num, start)
  version = bin_num[start..start + 2].to_i(2)
  type_id = bin_num[start + 3..start + 5].to_i(2)
  start += 7

  total_subpackets = bin_num[start..start + 10].to_i(2)
  start += 11
  values = []

  total_subpackets.times do
    new_version, value, new_start = handle_packet(bin_num, start)
    version += new_version
    values << value
    start = new_start
  end

  [version, handle_operation(type_id, values), start]
end

def handle_packet(bin_num, start)
  type_id = bin_num[start + 3..start + 5].to_i(2)

  if type_id == 4
    return handle_literal_value_packet(bin_num, start)
  elsif bin_num[start + 6] == '0'
    return handle_15_bit_operator(bin_num, start)
  end

  handle_11_bit_operator(bin_num, start)
end

bin_nums = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map do |hex_num|
  hex_to_binary(hex_num)
end

total = 0

bin_nums.each do |bin_num|
  total += handle_packet(bin_num, 0)[1]
end

puts total